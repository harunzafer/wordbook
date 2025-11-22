# Tasks Directory

This directory contains task files for tracking work on Wordbook.

## Naming Convention

Tasks follow a flat structure with story grouping:

```
STORY_NO-STORY_NAME-task_no-task_name.md
```

**Examples:**
```
001-SEO-01-add-meta-tags.md
001-SEO-02-add-og-tags.md
002-I18N-01-add-dutch.md
002-I18N-02-add-rtl-support.md
003-PERF-01-add-caching.md
```

**Format breakdown:**
- `STORY_NO` - 3-digit story number (001, 002, etc.)
- `STORY_NAME` - Brief story identifier (ALL CAPS)
- `task_no` - 2-digit task number within story (01, 02, etc.)
- `task_name` - Descriptive task name (lowercase, hyphenated)

This format ensures:
- Tasks sort alphabetically by story
- Related tasks are grouped together
- Clear hierarchy without nested folders

## Directory Structure

```
tasks/
├── README.md
├── 001-SEO-01-add-meta-tags.md
├── 001-SEO-02-add-og-tags.md
├── 002-I18N-01-add-dutch.md
└── completed/
    └── (completed task files)
```

Completed tasks are moved to the `completed/` subdirectory.

## Task Template

```markdown
# Task Title

**Status:** Not Started | In Progress | Completed
**Story:** STORY_NO-STORY_SHORT_NAME
**Estimated Time:** (optional)

## Overview
Brief description of what this task accomplishes.

## Goals
- Goal 1
- Goal 2
- Goal 3

## Acceptance Criteria
- [ ] Criterion 1
- [ ] Criterion 2
- [ ] Criterion 3

## Technical Notes
Implementation details, approach, or considerations.

## Related Files
- `path/to/file1.ts`
- `path/to/file2.svelte`

## Dependencies
- Task XXX-task-name (status)

## Notes
Additional context, decisions, or references.
```

## Status Values

| Status | Description |
|--------|-------------|
| Not Started | Task has not been worked on |
| In Progress | Task is currently being worked on |
| Completed | Task is done and moved to `completed/` |

## Creating a New Story

1. Determine the next available story number
2. Choose a short, descriptive name for the story
3. Create task files following the naming convention
4. Include story reference in each task's frontmatter

## Tips

- Keep task names concise but descriptive
- One task should be completable in **30 minutes or less** (max 45 minutes)
- If a task seems larger, break it into smaller subtasks
- Link related tasks via the Dependencies section
- Update status as work progresses
- Move completed tasks to `completed/` folder
