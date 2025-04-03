# from flask import Flask, request, jsonify
# from flask_cors import CORS
# import cv2
# import numpy as np
# import easyocr
# import os

# app = Flask(__name__)
# CORS(app)

# UPLOAD_FOLDER = "uploads"
# os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# # Function to preprocess image before OCR
# def preprocess_image(img_path):
#     img = cv2.imread(img_path, cv2.IMREAD_GRAYSCALE)  # Convert to grayscale
#     img = cv2.GaussianBlur(img, (5, 5), 0)  # Reduce noise
#     img = cv2.adaptiveThreshold(img, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY, 11, 2)  # Binarization
#     cv2.imwrite(img_path, img)  # Overwrite the original image
#     return img_path

# # Function to recognize text from an image
# def recognize_text(img_path):
#     reader = easyocr.Reader(['en'], gpu=False)  # Use CPU for compatibility
#     result = reader.readtext(img_path, detail=0, paragraph=True)  # Return text as full sentences
#     return " ".join(result)  # Combine extracted text into a single string

# # API endpoint for image upload and OCR
# @app.route('/upload', methods=['POST'])
# def upload_image():
#     if 'file' not in request.files:
#         return jsonify({"error": "No file uploaded"}), 400
    
#     file = request.files['file']
#     if file.filename == '':
#         return jsonify({"error": "No selected file"}), 400

#     img_path = os.path.join(UPLOAD_FOLDER, file.filename)
#     file.save(img_path)  # Save uploaded file

#     # Preprocess image
#     preprocessed_path = preprocess_image(img_path)

#     # Perform OCR on preprocessed image
#     extracted_text = recognize_text(preprocessed_path)

#     return jsonify({"extracted_text": extracted_text})

# if __name__ == '__main__':
#     app.run(host="0.0.0.0", port=5000, debug=True)






# from flask import Flask, request, jsonify
# from flask_cors import CORS
# import cv2
# import numpy as np
# import easyocr
# import os
# import google.generativeai as genai

# app = Flask(__name__)
# CORS(app)

# UPLOAD_FOLDER = "uploads"
# os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# genai.configure(api_key="AIzaSyDDfcJ0cUVc0HcobED54PeLPl-wX7D77JM")  # Replace with actual API key
# model = genai.GenerativeModel("gemini-1.5-pro-latest")

# # Function to preprocess image before OCR
# def preprocess_image(img_path):
#     img = cv2.imread(img_path, cv2.IMREAD_GRAYSCALE)  # Convert to grayscale
#     img = cv2.GaussianBlur(img, (5, 5), 0)  # Reduce noise
#     img = cv2.adaptiveThreshold(img, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY, 11, 2)  # Binarization
#     cv2.imwrite(img_path, img)  # Overwrite the original image
#     return img_path

# # Function to recognize text from an image
# def recognize_text(img_path):
#     reader = easyocr.Reader(['en'], gpu=False)  # Use CPU for compatibility
#     result = reader.readtext(img_path, detail=0, paragraph=True)  # Return text as full sentences
#     return " ".join(result)  # Combine extracted text into a single string

# # Function to correct grammar using Gemini AI
# def correct_grammar(text):
#     prompt = f"Correct the grammar in the following text and return only the corrected version:\n\n{text}"
#     try:
#         response = model.generate_content(prompt)
#         return response.text.strip() if response and response.text else "No response."
#     except Exception as e:
#         return f"Error: {str(e)}"

# # API endpoint for image upload, OCR, and grammar correction
# @app.route('/upload', methods=['POST'])
# def upload_image():
#     if 'file' not in request.files:
#         return jsonify({"error": "No file uploaded"}), 400
    
#     file = request.files['file']
#     if file.filename == '':
#         return jsonify({"error": "No selected file"}), 400

#     img_path = os.path.join(UPLOAD_FOLDER, file.filename)
#     file.save(img_path)  # Save uploaded file

#     # Preprocess image
#     preprocessed_path = preprocess_image(img_path)

#     # Perform OCR on preprocessed image
#     extracted_text = recognize_text(preprocessed_path)

#     # Correct grammar using Gemini AI
#     corrected_text = correct_grammar(extracted_text)

#     return jsonify({"extracted_text": corrected_text})

# if __name__ == '__main__':
#     app.run(host="0.0.0.0", port=5000, debug=True)









from flask import Flask, request, jsonify
from flask_cors import CORS
import cv2
import numpy as np
import easyocr
import os
import google.generativeai as genai

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

genai.configure(api_key="AIzaSyDDd57Upf2MkK-JvLpwprTesdN9GnGEdMY")  # Replace with actual API key
model = genai.GenerativeModel("gemini-1.5-pro-latest")

last_extracted_text = "No extracted text yet."  # Store the last extracted text

# Function to preprocess image before OCR
def preprocess_image(img_path):
    img = cv2.imread(img_path, cv2.IMREAD_GRAYSCALE)  # Convert to grayscale
    img = cv2.GaussianBlur(img, (5, 5), 0)  # Reduce noise
    img = cv2.adaptiveThreshold(img, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY, 11, 2)  # Binarization
    cv2.imwrite(img_path, img)  # Overwrite the original image
    return img_path

# Function to recognize text from an image
def recognize_text(img_path):
    reader = easyocr.Reader(['en'], gpu=False)  # Use CPU for compatibility
    result = reader.readtext(img_path, detail=0, paragraph=True)  # Return text as full sentences
    return " ".join(result)  # Combine extracted text into a single string

# Function to correct grammar using Gemini AI
def correct_grammar(text):
    prompt = f"Correct the grammar in the following text and return only the corrected version:\n\n{text}"
    try:
        response = model.generate_content(prompt)
        return response.text.strip() if response and response.text else "No response."
    except Exception as e:
        return f"Error: {str(e)}"

# API endpoint for image upload, OCR, and grammar correction
@app.route('/upload', methods=['POST'])
def upload_image():
    global last_extracted_text  # Use global variable to store extracted text

    if 'file' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    img_path = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(img_path)  # Save uploaded file

    # Preprocess image
    preprocessed_path = preprocess_image(img_path)

    # Perform OCR on preprocessed image
    extracted_text = recognize_text(preprocessed_path)

    # Correct grammar using Gemini AI
    corrected_text = correct_grammar(extracted_text)

    # Store extracted text for retrieval
    last_extracted_text = corrected_text

    return jsonify({"extracted_text": corrected_text})

# New endpoint to fetch the last extracted text
@app.route('/extracted_text', methods=['GET'])
def get_extracted_text():
    return jsonify({"extracted_text": last_extracted_text})

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000, debug=True)
