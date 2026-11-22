---
title: "Git Workflow Tips for Solo Developers"
slug: "git-workflow-tips"
date: "2024-01-10"
excerpt: "Practical Git workflows and best practices that make version control easier, even when working alone on projects."
tags: ["Git", "Development", "Tools", "Best Practices"]
featured: false
---

# Git Workflow Tips for Solo Developers

Even when working alone, good Git practices help you track changes, experiment safely, and maintain a clean project history. Here are practical tips I use daily.

## 1. Commit Often, Commit Early

Small, focused commits are easier to understand and revert if needed.

```bash
# ❌ Bad: One giant commit at the end
git add .
git commit -m "Updated everything"

# ✅ Good: Small, focused commits
git add src/auth/
git commit -m "Add user authentication logic"

git add tests/auth/
git commit -m "Add authentication tests"

git add docs/auth.md
git commit -m "Document authentication flow"
```

## 2. Write Meaningful Commit Messages

Your future self will thank you for clear commit messages.

```bash
# ❌ Bad messages
git commit -m "fix"
git commit -m "update code"
git commit -m "aaa"

# ✅ Good messages
git commit -m "Fix login redirect loop on session timeout"
git commit -m "Add validation for email format in signup form"
git commit -m "Optimize database query in user dashboard"
```

### Commit Message Template

```
<type>: <subject>

<body>

<footer>
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Formatting, missing semicolons, etc.
- `refactor`: Code restructuring
- `test`: Adding tests
- `chore`: Maintenance tasks

**Example:**
```
feat: Add password reset functionality

Implement email-based password reset with:
- Reset token generation and validation
- Email notification service
- Password reset form component

Closes #123
```

## 3. Use Branches for Features

Even solo, branches keep your main code stable.

```bash
# Create feature branch
git checkout -b feature/user-profile

# Work on feature
git add .
git commit -m "Add user profile page"

# Merge back when done
git checkout main
git merge feature/user-profile

# Delete feature branch
git branch -d feature/user-profile
```

## 4. Use .gitignore Properly

Keep your repository clean by ignoring unnecessary files.

```gitignore
# Dependencies
node_modules/
vendor/

# Environment variables
.env
.env.local

# IDE files
.vscode/
.idea/
*.swp

# Build output
dist/
build/
*.log

# OS files
.DS_Store
Thumbs.db
```

## 5. Stash Uncommitted Changes

When you need to switch contexts quickly:

```bash
# Save current work
git stash save "WIP: working on header component"

# Do something else
git checkout main
git pull

# Return to your work
git checkout feature/header
git stash pop
```

## 6. Review Changes Before Committing

Always check what you're committing:

```bash
# See what changed
git status

# See line-by-line changes
git diff

# Stage files selectively
git add -p  # Interactive staging

# Review staged changes
git diff --staged
```

## 7. Use Tags for Releases

Mark important milestones:

```bash
# Create annotated tag
git tag -a v1.0.0 -m "Release version 1.0.0"

# Push tags to remote
git push origin --tags

# List all tags
git tag -l
```

## 8. Keep Your History Clean

Use interactive rebase to clean up commits before merging:

```bash
# Rebase last 3 commits
git rebase -i HEAD~3

# Options:
# pick - keep commit as is
# reword - change commit message
# squash - combine with previous commit
# drop - remove commit
```

## 9. Create Aliases for Common Commands

Save time with Git aliases:

```bash
# In ~/.gitconfig
[alias]
  st = status
  co = checkout
  br = branch
  ci = commit
  lg = log --oneline --graph --all --decorate
  last = log -1 HEAD
  unstage = reset HEAD --
  
# Usage
git st
git lg
git last
```

## 10. Regular Backups with Remote Repository

Even for personal projects, push to GitHub/GitLab regularly:

```bash
# Initial setup
git remote add origin https://github.com/username/project.git

# Regular pushes
git push origin main

# Push all branches and tags
git push --all origin
git push --tags
```

## Useful Commands Cheat Sheet

```bash
# Undo last commit (keep changes)
git reset --soft HEAD~1

# Undo last commit (discard changes)
git reset --hard HEAD~1

# Amend last commit
git commit --amend

# View commit history
git log --oneline --graph

# Show file at specific commit
git show commit_hash:path/to/file

# Find when bug was introduced
git bisect start
git bisect bad  # Current version is bad
git bisect good commit_hash  # Known good commit

# Clean untracked files
git clean -fd
```

## Conclusion

Good Git habits make development smoother, even when working solo. They help you:
- Track your progress
- Experiment safely
- Understand past decisions
- Recover from mistakes quickly

Start with a few practices that resonate with you, then gradually adopt more as they become natural.

**Key Takeaways:**
- Commit small and often
- Write clear commit messages
- Use branches for features
- Review before committing
- Keep your history clean
- Push regularly to remote

What's your favorite Git workflow tip? Let me know!
