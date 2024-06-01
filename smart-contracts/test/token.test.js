const { expect } = require("chai");

describe("GreenEnergyToken", function() {

    it("should have 100 tokens after deployment",async function(){
        const GreenEnergyToken = await ethers.getContractFactory("GreenEnergyToken");
        const GET = await GreenEnergyToken.deploy();
        const instance = await GET.deployed();
        const expectedSupply = ethers.utils.parseEther("100");
        console.log(await instance.totalSupply())
        expect(await instance.totalSupply()).to.equal(expectedSupply);
    });
});