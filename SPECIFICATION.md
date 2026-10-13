# Mohammed Quiz - Specification Document

**Project:** Mohammed Quiz Web Application  
**Author:** Jerry33331  
**Date:** October 2026  
**Version:** 1.0  

---

## Table of Contents

1. [Theme and Design](#1-theme-and-design)
2. [Two Custom Features](#2-two-custom-features)
3. [Questions and Quiz Content](#3-questions-and-quiz-content)
4. [User Experience and Navigation](#4-user-experience-and-navigation)
5. [Page Design Details](#5-page-design-details)
6. [Leaderboard Rules](#6-leaderboard-rules)
7. [Development Phases](#7-development-phases)
8. [Development Workflow](#8-development-workflow)

---

## 1. Theme and Design

### App Name
**Mohammed Quiz**

### Audience
High school students, teachers, and general knowledge enthusiasts who want to test their understanding across various subjects in a clean, engaging environment.

### Quiz Topics
1. General Knowledge - Mixed questions from various categories
2. Science - Physics, chemistry, and biology concepts
3. History - Historical events and figures
4. Mathematics - Math problems and concepts
5. Geography - Countries, capitals, and world facts

### Overall Style
Clean, modern, and minimalist with a focus on readability and user engagement. The design uses subtle animations and visual cues to guide users through the quiz experience without being distracting.

### Colors
- **Primary Background:** `#f7f7f2` (Off-white, warm tone)
- **Text:** `#1a1a1a` (Dark gray for readability)
- **Accent Color:** `#4f46e5` (Indigo - for buttons and interactive elements)
- **Success:** `#10b981` (Green - for correct answers)
- **Error:** `#ef4444` (Red - for incorrect answers)
- **Border/Secondary:** `#e5e7eb` (Light gray)
- **Hover States:** `#3730a3` (Darker indigo)

### Fonts
- **Primary:** `Inter, -apple-system, BlinkMacSystemFont, sans-serif` (Clean, modern system font stack)
- **Headings:** Bold weight of primary font
- **Body:** Regular weight, 16px base size
- **Code/Technical:** `SFMono-Regular, Consolas, monospace` for any technical display

### Visual Mood
- **Inspiration:** Modern educational platforms, clean tech blogs
- **Mood:** Professional yet approachable, encouraging curiosity
- **Design Elements:**
  - Subtle geometric shapes in the background
  - Smooth transitions and hover effects
  - Minimal use of icons, focusing on typography
  - "Spark" elements (✧, ✦) as decorative accents
  - Question mark motif for branding

### Design Inspiration Sources
- Apple's human interface guidelines (clean spacing)
- GitHub's minimalist approach to content presentation
- Educational platforms like Khan Academy (focus on learning)

---

## 2. Two Custom Features

### Custom Feature 1: Daily Challenge

**What it does:**
- Presents users with one unique question each day
- The question changes automatically at midnight (server time)
- Users can answer once per day
- Tracks daily streaks (consecutive days with correct answers)
- Displays streak counter on user profile

**Difficulty:** Medium
- Requires tracking the last answer date per user
- Needs server-side date handling
- Simple frontend display of streak information

**Data needed:**
- `daily_challenges` table: id, question_id, date, created_at
- `user_daily_attempts` table: id, user_id, challenge_id, answered_correctly, answered_at
- Add `current_streak` and `longest_streak` columns to `users` table

**How it works:**
1. Server selects one random question each day at midnight
2. When user visits the site, they see the daily challenge question
3. User submits their answer
4. Server records the attempt and updates streak if correct
5. User sees their current streak and longest streak on their profile

**Acceptance Criteria:**
- [ ] One daily question appears on the homepage
- [ ] Question changes at midnight server time
- [ ] User can answer only once per day
- [ ] Streak counter increments for correct answers
- [ ] Streak resets after one missed day
- [ ] Longest streak is preserved

---

### Custom Feature 2: Question Favorites

**What it does:**
- Allows users to bookmark/favorite questions they want to review later
- Creates a personal "study list" of questions
- Users can review their favorited questions in a dedicated section
- Questions can be removed from favorites

**Difficulty:** Medium
- Requires new database table for user-question relationships
- Needs frontend UI for adding/removing favorites
- Requires a new page to display favorited questions

**Data needed:**
- `user_favorites` table: id, user_id, question_id, created_at

**How it works:**
1. Each question card has a bookmark icon
2. Clicking the icon toggles the favorite status
3. User can view all their favorited questions on a "My Favorites" page
4. Questions can be filtered by quiz category
5. User can remove questions from favorites

**Acceptance Criteria:**
- [ ] Bookmark icon appears on each question
- [ ] Clicking bookmark adds/removes from favorites
- [ ] "My Favorites" page shows all user's favorited questions
- [ ] Questions can be filtered by category
- [ ] User can remove questions from favorites list
- [ ] Visual feedback when adding/removing favorites

---

## 3. Questions and Quiz Content

### Quiz Structure
- **5 quizzes** total
- **10 questions** per quiz
- Each question has **4 answer choices**
- **Exactly one correct answer** per question
- All questions include an **explanation** shown after answering

### Quiz Topics and Details

#### Quiz 1: General Knowledge
- **Difficulty:** Easy to Medium
- **Question Types:** Multiple choice, factual recall
- **Tone:** Friendly, educational
- **Knowledge Tested:** Broad general knowledge across various subjects

#### Quiz 2: Science
- **Difficulty:** Medium
- **Question Types:** Conceptual understanding, factual recall
- **Tone:** Educational, precise
- **Knowledge Tested:** Physics, chemistry, biology fundamentals

#### Quiz 3: History
- **Difficulty:** Medium
- **Question Types:** Date recall, figure identification, event knowledge
- **Tone:** Informative, respectful
- **Knowledge Tested:** World history, major events, historical figures

#### Quiz 4: Mathematics
- **Difficulty:** Medium to Hard
- **Question Types:** Calculation, conceptual, problem-solving
- **Tone:** Clear, logical
- **Knowledge Tested:** Arithmetic, algebra, geometry basics

#### Quiz 5: Geography
- **Difficulty:** Medium
- **Question Types:** Location identification, factual recall
- **Tone:** Educational, world-aware
- **Knowledge Tested:** Countries, capitals, physical geography

### Question Quality Standards
- Each question is clear and unambiguous
- All four choices are plausible
- Exactly one correct answer (verified)
- Explanations provide educational value
- Questions are appropriate for high school level
- No offensive or inappropriate content

---

## 4. User Experience and Navigation

### User Types
1. **Guest** - Can view homepage, but cannot take quizzes
2. **Player** - Can register, login, take quizzes, view history
3. **Teacher** - Can do everything a player can, plus edit questions
4. **Admin** - Full access including user management

### Navigation Flow

#### For New Players (Not Logged In)
1. Landing Page -> Register/Login -> Quiz Selection

#### For Returning Players (Logged In)
1. Landing Page -> Quiz Selection -> Take Quiz -> Results -> (Retry or History)
2. Landing Page -> Profile -> (History, Favorites, Logout)

#### For Teacher/Admin Users
1. All player flows + Admin Tools -> (Question Editor, CSV Import, User Management)

### Button and Action Behavior
- **Register**: Validates input, creates account, redirects to login
- **Login**: Authenticates, creates session, redirects to quizzes
- **Logout**: Ends session, redirects to homepage
- **Start Quiz**: Loads first question, starts new attempt
- **Submit Quiz**: Validates all answered, calculates score, saves attempt, shows results
- **Retry Quiz**: Starts new attempt for the same quiz

---

## 5. Page Design Details

### Layout Structure (All Pages)
```
+--------------------------------------------------+
|  TOP BAR: Brand Logo | User Info | Navigation    |
+--------------------------------------------------+
|  MAIN CONTENT AREA                                  |
+--------------------------------------------------+
|  FOOTER: Copyright/Info                             |
+--------------------------------------------------+
```

### Pages
1. **Landing Page** - Hero section, quiz preview, daily challenge
2. **Quiz Selection** - Grid of 5 quiz cards
3. **Quiz Taking** - One question at a time with navigation
4. **Results** - Score, percentage, per-question feedback
5. **History** - List of past attempts
6. **Profile** - User stats, streak display
7. **Favorites** - Bookmarked questions
8. **Question Editor** - Add/edit/delete questions
9. **CSV Import** - Upload and preview questions
10. **User Management** - View/edit users (admin only)

### Mobile Behavior
- Responsive design with hamburger menu
- Single column layout on mobile
- Large touch targets (44x44px minimum)

---

## 6. Leaderboard Rules

### Overall Leaderboard
- **Ranking:** Total completed attempts (descending), then average score (descending), then join date (ascending)
- **Display:** Rank, Username, Total Attempts, Average Score
- **Rules:** Only completed attempts count, unfinished attempts do NOT count

### Quiz-Specific Leaderboards
- **Ranking:** Highest score (descending), then number of attempts (descending), then most recent date (descending)
- **Display:** Rank, Username, Highest Score, Attempts Count, Date
- **Rules:** Only highest score per user per quiz counts for ranking

---

## 7. Development Phases

### Phase 1: Foundation + Authentication
**Main Goal:** Establish the app architecture and user system
- Express server, static frontend, PostgreSQL connection
- Database schema, registration, login, logout
- Hashed passwords, player/admin roles

### Phase 2: Quiz Engine
**Main Goal:** Make the core quiz experience work
- Quiz selection, display questions, 4 choices, one correct answer
- Submit answers, calculate score/percentage, results page, retry

### Phase 3: Attempts + User History
**Main Goal:** Persist quiz activity
- Save every completed attempt with user/quiz association
- Timestamps, personal attempt history
- Prevent unfinished attempts from counting

### Phase 4: Leaderboards + Admin Tools
**Main Goal:** Build shared data features and teacher management
- Overall leaderboard, quiz leaderboards, ranking rules
- Question editor, add/edit questions and choices, quiz assignments
- CSV upload, preview, validation, import

### Phase 5: Custom Features + Production Readiness
**Main Goal:** Make the project unique and production-ready
- Daily Challenge feature
- Question Favorites feature
- Integration testing, edge cases, responsive design, polish
- Production database, Replit Deployment, final acceptance testing

---

## 8. Development Workflow

For every phase:
1. Start from updated `main` branch
2. Create new feature branch: `phase-[n]-[description]`
3. Do ALL development on the feature branch
4. Do NOT develop directly on `main`
5. Test in Replit development workspace (QA environment)
6. Test every acceptance criterion for the phase
7. Fix failures on the feature branch
8. Commit working changes to the feature branch
9. Merge feature branch into `main` only after phase passes testing
10. Verify `main` still works after the merge
11. Begin next phase from updated `main`

**Rule:** `main` represents the latest tested, working version. Students MAY NOT make feature-development changes directly on `main`.

---

## Appendix: Tech Stack Confirmation

- **Frontend:** Plain HTML, CSS, and JavaScript
- **Server:** Node.js 24 LTS and Express 5
- **Database:** Replit PostgreSQL
- **Database Access:** `pg` with parameterized SQL
- **Password Hashing:** bcryptjs
- **Session Management:** express-session with connect-pg-simple
- **Package Manager:** npm with committed `package-lock.json`
- **Version Control:** GitHub
- **QA Environment:** Replit development workspace
- **Production:** Replit Deployment with separate production database

---

*This specification document defines all design decisions for the Mohammed Quiz project. All development must follow this specification.*
