from flask import Flask, request, send_file, render_template
import pdfkit
from openai import OpenAI
from config import OPENAI_API_KEY

# 初始化客户端
client = OpenAI(api_key=OPENAI_API_KEY)

app = Flask(__name__)

def generate_report(company_data):
    prompt = f"""
    You are a sustainability expert tasked with analyzing a dataset containing carbon emissions data and carbon offset data for various companies across different industries. The goal is to generate a comprehensive report for each company based on the provided data, formatted in a fixed structure and exported as a PDF. Here is a detailed structure for the dataset and the report:

    Dataset Structure:
    - Company Name
    - Industry
    - Year
    - Carbon Emissions (tons)
    - Carbon Offsets (tons)
    - Emission Reduction Initiatives (optional text field describing the initiatives taken by the company to reduce emissions)

    Report Structure:
    1. Title Page:
       - Report Title: "Company Carbon Emissions and Offset Report"
       - Company Name
       - Industry
       - Date of Report Generation

    2. Introduction:
       - Provide a brief introduction about the company, including its industry and the importance of managing carbon emissions.

    3. Carbon Emissions Analysis:
       - Present the total carbon emissions for the company over the reported period.
       - Analyze the annual carbon emissions trend and identify any significant changes or patterns.

    4. Carbon Offsets Analysis:
       - Summarize the total carbon offsets purchased by the company over the reported period.
       - Compare the annual carbon offsets with the annual carbon emissions to assess the net carbon emissions (Carbon Emissions - Carbon Offsets).

    5. Net Carbon Emissions:
       - Calculate the net carbon emissions for each year and provide a summary of the overall trend.
       - Highlight any years where the company achieved carbon neutrality or significant reductions in net emissions.

    6. Industry Comparison:
       - Compare the company’s carbon emissions and offsets with industry averages to provide context on the company’s performance relative to its peers.

    7. Emission Reduction Initiatives:
       - Describe any emission reduction initiatives undertaken by the company as noted in the dataset.
       - Evaluate the effectiveness of these initiatives based on the emission data.

    8. Conclusion and Recommendations:
       - Summarize the key findings from the analysis.
       - Provide recommendations for further reducing carbon emissions and enhancing sustainability efforts.

    9. Visualization:
       - Include visual aids such as charts or graphs to illustrate the trends in carbon emissions, offsets, and net emissions.

    Output Requirements:
    - The report should be structured in clear, professional paragraphs with headings for each section.
    - Data should be presented in tables where applicable, and charts or graphs should be included to enhance understanding.
    - The final report must be formatted as a PDF document.

    Example Data:
    {company_data}

    Generate the report for each company in the dataset following the above structure and export the report as a PDF.
    """

    messages = [
        {"role": "system", "content": "You are a sustainability expert."},
        {"role": "user", "content": prompt}
    ]

    response = client.chat.completions.create(
        model="gpt-4",  # 使用适当的模型
        messages=messages
    )
    
    return response['choices'][0]['message']['content']

@app.route('/')
def index():
    return render_template('carbon-emission-report.html')

@app.route('/generate_report', methods=['POST'])
def generate_report_endpoint():
    company_data = request.json.get('company_data')
    report_content = generate_report(company_data)

    # Convert the report to PDF
    pdf_path = "report.pdf"
    pdfkit.from_string(report_content, pdf_path)

    return send_file(pdf_path, as_attachment=True)

if __name__ == '__main__':
    app.run(debug=True)
