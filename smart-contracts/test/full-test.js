const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("GreenEnergyToken", function () {
    let GreenEnergyToken, GET, owner, addr1, addr2;

    beforeEach(async function () {
        GreenEnergyToken = await ethers.getContractFactory("GreenEnergyToken");
        [owner, addr1, addr2] = await ethers.getSigners();
        GET = await GreenEnergyToken.deploy();
        await GET.deployed();
    });

    it("should have 100 tokens after deployment", async function () {
        const expectedSupply = ethers.utils.parseEther("100");
        const totalSupply = await GET.totalSupply();
        expect(totalSupply).to.equal(expectedSupply);
    });

    it("should mint new tokens only by the owner", async function () {
        await GET.mint(ethers.utils.parseEther("50"));
        const contractBalance = await GET.balanceOf(GET.address);
        expect(contractBalance).to.equal(ethers.utils.parseEther("150"));
    });

    it("should fail if not owner tries to mint", async function () {
        await expect(
            GET.connect(addr1).mint(ethers.utils.parseEther("50"))
        ).to.be.revertedWith("Caller is not the owner");
    });

    it("should allow user to buy tokens", async function () {
        const buyValue = ethers.utils.parseEther("10");
        await GET.connect(addr1).buy({ value: buyValue });
        const addr1Balance = await GET.balanceOf(addr1.address);
        expect(addr1Balance).to.equal(buyValue);
    });

    it("should allow adding carbon footprint by approved IoT device", async function () {
        await GET.approveIOT(addr1.address, addr1.address); // approve addr1 as IoT device for addr1
        await GET.connect(addr1).addFootprint(addr1.address, ethers.utils.parseEther("20"));
        const footprint = await GET.getFootPrint(addr1.address);
        expect(footprint).to.equal(ethers.utils.parseEther("20"));
    });

    it("should allow user to compensate tokens and update carbon footprint", async function () {
      const buyValue = ethers.utils.parseEther("10");
      const footprintValue = ethers.utils.parseEther("10");
  
      // User buys tokens
      await GET.connect(addr1).buy({ value: buyValue });
      
      // Approve and add carbon footprint before compensating
      await GET.approveIOT(addr1.address, addr1.address);
      await GET.connect(addr1).addFootprint(addr1.address, footprintValue);
  
      // Verify initial carbon footprint
      let initialFootprint = await GET.getFootPrint(addr1.address);
      expect(initialFootprint).to.equal(footprintValue);
  
      // Compensate tokens
      await GET.connect(addr1).compensate(ethers.utils.parseEther("5"));
  
      // Verify remaining balance
      const addr1Balance = await GET.balanceOf(addr1.address);
      expect(addr1Balance).to.equal(ethers.utils.parseEther("5"));
  
      // Verify updated carbon footprint
      const updatedFootprint = await GET.getFootPrint(addr1.address);
      expect(updatedFootprint).to.equal(ethers.utils.parseEther("5"));
  });
  

  it("should fail if user tries to compensate more tokens than they have", async function () {
    const buyValue = ethers.utils.parseEther("10");
    const footprintValue = ethers.utils.parseEther("10");

    // User buys tokens
    await GET.connect(addr1).buy({ value: buyValue });
    
    // Approve and add carbon footprint before compensating
    await GET.approveIOT(addr1.address, addr1.address);
    await GET.connect(addr1).addFootprint(addr1.address, footprintValue);

    await expect(
        GET.connect(addr1).compensate(ethers.utils.parseEther("15"))
    ).to.be.revertedWith("Insufficient balance to compensate");
});


    it("should change ownership", async function () {
        await GET.changeOwner(addr1.address);
        expect(await GET.owner()).to.equal(addr1.address);
    });

    it("should fail if non-owner tries to change ownership", async function () {
        await expect(
            GET.connect(addr1).changeOwner(addr2.address)
        ).to.be.revertedWith("Caller is not the owner");
    });
});
