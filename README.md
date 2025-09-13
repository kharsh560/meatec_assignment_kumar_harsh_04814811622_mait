# Task Management App + React + TypeScript + Vite

This project is a frontend-only task management application built with React, TypeScript, Redux Toolkit, and Vite. It uses Mock Service Worker to simulate backend APIs for authentication and task CRUD operations.

The UI is built with Tailwind CSS and ShadCN components, featuring modals for task creation and editing, and a theme toggle for light and dark modes.

#### I have hosted the dockerized container of this project and deployed it on render too, means its live. Please check: 
#### "https://task-manager-using-msw.onrender.com/"

## Features

* Mocked authentication with MSW (username: `test`, password: `test123`)
* Dashboard with a list of tasks
* Add, edit, and delete tasks using modals
* Global theme toggle (light and dark mode)
* State management with Redux Toolkit
* Mocked backend endpoints
  * POST /login
  * GET /tasks
  * POST /tasks
  * PUT /tasks/:id
  * DELETE /tasks/:id

## Running the project

Clone the repo and install dependencies:

```
npm install
```

Start the dev server:

```
npm run dev
```

The app will be available at `http://localhost:5173/` (or whichever port Vite chooses).

## Authentication flow

When signing in, MSW intercepts the request and returns a fake JWT if the credentials are correct. Redux stores this token in memory and also saves it in local storage for persistence.

## Task management flow

Tasks are also handled entirely through MSW. Requests to `/tasks` are intercepted and responded to using an in-memory task list. Redux stores the tasks so the UI updates immediately.

Note that tasks reset on a full page reload unless persistence logic is added with local storage.

## Curiously learned

I was sitting and thinking about this for a while. When I click that shiny "Add Task" button, where on earth is Mock Service Worker putting my new task? Is it really storing it somewhere like a database or is it all smoke and mirrors?

So I went on a little curiosity trip. After a bit of gptying around and peeking through the docs, I found the answer. MSW actually keeps a tiny fake database in memory, right inside the service worker process. That means when I add a new task, MSW just pushes it into that in-memory array and then sends it back as if it came from a real server.

But here is the catch. This in-memory list is temporary. The moment you refresh the browser, MSW forgets everything and resets back to whatever you initially hardcoded. Redux also forgets everything on refresh, because its state lives in memory too. That is why after reloading you only see the starting tasks again.

If I actually want tasks to survive after refreshing the page, I need to add persistence manually. That usually means saving them to local storage either directly from Redux or by making MSW read and write from it. Without that, MSW is like a magician pulling rabbits out of a hat. Fun to watch but nothing stays once the trick is over.

## Tech stack

* React 19 + TypeScript + Vite
* Redux Toolkit for state management
* React Router for navigation
* Mock Service Worker (MSW) for backend simulation
* Tailwind CSS + ShadCN for UI styling

## Future scope:-
* Local storage for optional persistence or entire backend dedicated to this. I am a full stack dev and hence can do backends also.
