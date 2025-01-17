
import pandas as pd
import pandas as pd
from sentence_transformers import SentenceTransformer, util

# Load the BERT model
model = SentenceTransformer('all-MiniLM-L6-v2')

def get_data(file_path):
    return pd.read_csv(file_path)

def clean_geographic_area(data):
    """
    Remove the word 'Average' from the 'Geographic Area' column.
    :param data: pd.DataFrame, the dataset to clean.
    :return: pd.DataFrame, the cleaned dataset.
    """
    data['Geographic Area'] = data['Geographic Area'].str.replace(' Average', '', regex=False)
    return data

def find_closest_value(input_title, job_titles):
    """
    Find the closest job title using a BERT model.
    :param input_title: str, the job title to match.
    :param job_titles: List[str], a list of job titles from the dataset.
    :return: str, the closest matching job title.
    """
    # Encode the input and job titles
    input_embedding = model.encode(input_title, convert_to_tensor=True)
    job_embeddings = model.encode(job_titles, convert_to_tensor=True)

    # Compute cosine similarity
    similarities = util.cos_sim(input_embedding, job_embeddings)

    # Find the index of the highest similarity
    best_match_index = similarities.argmax().item()
    return job_titles[best_match_index]

def get_fmv_score(data, country, position, tier, inflation, hour_average, bonus):
    """
    Compute the fair market value (FMV) score for a given position and tier.
    If `country` is empty, compute the mean salary across all countries.
    """
    tier_field = ''
    if tier == 1:
        tier_field = '90th Percentile'
    elif tier == 2:
        tier_field = '75th Percentile'
    elif tier == 3:
        tier_field = '25th Percentile'
    elif tier == 4:
        tier_field = '10th Percentile'

    # Handle closest job title matching
    job_titles = data['Job Title'].unique()
    countries = data['Geographic Area'].unique()
    if position not in job_titles:
        closest_position = find_closest_value(position, job_titles)
    else:
        closest_position = position

    if country not in countries:
        closest_country = find_closest_value(country, countries)
    else:
        closest_country = country
        
    # Filter data for the selected job title
    filtered_data = data[data['Job Title'] == closest_position]

    # Compute salary based on country or mean across countries
    if country:
        salary = filtered_data[filtered_data['Geographic Area'] == closest_country][tier_field].values
        if len(salary) == 0:
            raise ValueError(f"No data found for country: {closest_country} and position: {closest_position}")
        salary = float(salary[0].replace(',', '').strip())
    else:
        # Compute the mean across all countries
        salaries = filtered_data[tier_field].dropna().apply(lambda x: float(x.replace(',', '').strip()))
        if len(salaries) == 0:
            raise ValueError(f"No data available for position: {position} across all countries")
        salary = salaries.mean()

    # Apply inflation, bonus, and hourly adjustment
    salary += salary * inflation + bonus
    salary /= hour_average
    print(salary)
    return salary


def main():
    file = 'fmv.csv'
    data = get_data(file)
    data = clean_geographic_area(data)  # Clean the 'Geographic Area' column

    print(data.head())
    country = 'United States'
    position = 'Researcher'
    tier = 1
    inflation = 0.03
    hour_average = 40*4*12
    bonus = 1000

    print(get_fmv_score(data, country, position, tier, inflation, hour_average, bonus))
    

def get_jobs(data):
    return data['Job Title'].unique()

main()