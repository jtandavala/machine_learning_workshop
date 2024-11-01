from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import numpy as np

app = Flask(__name__)



with open('./models/finalized_model.sav', 'rb') as f:
    model = pickle.load(f)

with open('./models/scaler.sav', 'rb') as f:
    scaler = pickle.load(f)

@app.route("/")
def index():
    return {"api": "v1"}

@app.route('/predict', methods=['POST'])
def predict():
   
    data = request.json
    
    input_data = [
        data['preg'],
        data['plas'],
        data['pres'],
        data['skin'],
        data['test'],
        data['mass'],
        data['pedi'],
        data['age']
    ]

   
    X = np.array(input_data).reshape(1, -1)  

    rescaledX = scaler.transform(X)
   
    prediction = model.predict(rescaledX)[0]  
    
    return jsonify({'prediction': int(prediction)})

if __name__ == '__main__':
    app.run(debug=True)




