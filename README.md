# Task Manager Demo

This repository contains a small demo of a task manager. Run `npm start` and open `http://localhost:3000` in a browser to try it out. Data is saved to `data.json` on disk so your tasks persist between restarts.

Features include:

- Sleek header with the title "Task Manager" in pink using a Segoe UI font.
- Collapsible settings area with project management, color selection, and toggleable lists of deleted and archived tasks.
- Each main task section (Weekly, One-Off, Recurring) can be collapsed by clicking its header.
- Weekly tasks grid (task + Monday to Sunday) with week navigation and a form to add new weekly tasks.
- Clickable day icons to mark completion, including optional completions on grey days.
- One-off tasks list with due date editing, archive and delete options.
- Recurring tasks list showing next due date, last completion and over/under metrics with skip or complete actions.
- Shopping list section to track purchases with project, estimated cost and target month.
- Projects can be closed when no open tasks reference them; closed projects are hidden from task forms.
- Project list displays whether open tasks are allocated and only offers the close button when none are open.
- Toast notifications appear when projects or tasks are added or modified.
- Data is persisted in `data.json` so your tasks survive between restarts.
