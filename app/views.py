from app import app
from flask import render_template
import pandas as pd
import numpy as np
from collections import defaultdict
import dataikuapi
import json



@app.route("/")
def index():
    return render_template('quiz.html')


@app.route('/generate_quiz')
def generate_quiz():
	dataset = get_dataset(project='LYRICSPREDICTION', dataset_name='test_predicted')
	df = load_df(dataset)
	NUM_QUESTIONS = 10
	df_subset = df.sample(n=NUM_QUESTIONS).reset_index(drop=True)
	df_subset['proba_dict'] = df_subset.apply(lambda x: x[[col for col in df_subset.columns.values if 'proba' in col]].to_dict(), axis=1)
	# df_subset['word_importances'] = [get_word_importances(lyrics) for lyrics in df_subset.lyrics]
	return json.dumps(df_subset.to_json(orient='records'))

def load_df(dataset: dataikuapi.dss.dataset.DSSDataset):
	rows = []
	for row in dataset.iter_rows():
		rows.append(row)
	df = pd.DataFrame(rows, columns=[col['name'] for col in dataset.get_schema()['columns']])
	return df


def get_dataset(project, dataset_name):
	host = 'https://dsproj1.dataiku.com'
	with open('credentials.json', 'r') as f:
	    credentials = json.load(f)
	client = dataikuapi.DSSClient(host, credentials['secret'])
	project = client.get_project(project)
	dataset = project.get_dataset(dataset_name)	
	return dataset