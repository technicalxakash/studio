# **App Name**: MediSys AI

## Core Features:

- Patient Registration: Allow receptionists to register new patients and store their basic information in the PostgreSQL database.
- Appointment Booking: Enable receptionists and patients to book and manage appointments.
- AI-Based Disease Risk Prediction: Implement an AI module that uses patient data to predict the risk of diseases such as heart disease, diabetes, stroke, and kidney disease.  The LLM may function as a tool, for example, to provide suggestions based on likelihood scores or known treatments. Models: RandomForest/XGBoost
- Smart Triage System: Develop an AI triage system that suggests doctor and priority level based on patient symptoms and vitals.
- Document AI: Allow users to upload doctor's notes and lab reports, using an NLP model to extract key information like patient name, medication, diagnosis, and follow-up date. Models: NER (spaCy) + OCR + Tesseract.
- Patient Chatbot: Develop an AI-powered chatbot to assist patients with symptoms, appointment booking, report explanations, and medication reminders.
- Secure User Roles: Implement secure user roles (Admin, Doctor, Nurse, Receptionist, Patient) with role-based access control.

## Style Guidelines:

- Primary color: Deep blue (#3F51B5) for a sense of trust and professionalism.
- Background color: Light blue (#E3F2FD) to maintain a calm, clinical feel.
- Accent color: Purple (#7E57C2) to provide contrast and highlight interactive elements.
- Body font: 'PT Sans', a humanist sans-serif to promote a little warmth and personality. Headline font: 'Space Grotesk', a proportional sans-serif with a computerized, techy, scientific feel.
- Code font: 'Source Code Pro' for displaying code snippets.
- Use clear and recognizable icons throughout the application.
- Subtle transitions and animations to provide feedback to the user.