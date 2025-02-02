# KidCode: AI Python Tutor

## Project Overview

KidCode: AI Python Tutor is an interactive web application designed to help children learn Python programming in a fun and engaging way. The project combines AI-powered tutoring with gamification elements to create an immersive learning experience.

## Key Features

- **AI-Powered Tutors**: Four unique AI tutors, each specializing in different Python concepts.
- **Interactive Chat Interface**: Real-time conversations with AI tutors for personalized learning.
- **Code Playground**: In-browser Python code editor with real-time execution.
- **Gamification**: XP system, levels, badges, and certificates to motivate learners.
- **Progress Tracking**: Visual representation of the learner's progress.
- **Dark Mode UI**: Eye-friendly interface for extended coding sessions.

## Technologies Used

- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
- shadcn/ui components
- Gemini AI API
- Canvas Confetti

## Setup and Installation

1. Clone the repository:
   ```
   git clone https://github.com/Arnab514/kidcode-ai-python-tutor.git
   cd kidcode-ai-python-tutor
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add your Gemini API key:
   ```
   GEMINI_API_KEY=your_api_key_here
   ```

4. Run the development server:
   ```
   npm run dev
   ```

5. Open `http://localhost:3000` in your browser to see the application.

## Usage Guide

1. **Home Page**: Introduces the app features and provides a "Start Learning" button.
2. **Tutor Page**: 
   - Select an AI tutor from the right sidebar.
   - Use the chat interface to ask questions and receive personalized guidance.
   - Switch to the Code Playground to write and execute Python code.
3. **Progress Tracking**: 
   - Gain XP by interacting with tutors and completing coding challenges.
   - Level up and earn badges as you progress.
   - Unlock certificates for major achievements.

## Future Improvements

- Implement user authentication and profile management.
- Add more advanced Python challenges and projects.
- Integrate a comprehensive curriculum with structured lessons.
- Implement peer-to-peer code review features.
- Add support for multiple programming languages.

## Contributors

- [Your Name] - Initial development and design

## Acknowledgments

- Gemini AI for providing the AI model used in this project.
- shadcn/ui for the beautiful and accessible UI components.
- The Next.js team for their excellent framework and documentation.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.