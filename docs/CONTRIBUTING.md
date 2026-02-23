# Contributing Guide

## Welcome to AquaGuard! 👋

We're excited that you want to contribute. This document provides guidelines and instructions.

## Code of Conduct

- Be respectful and inclusive
- No discrimination or harassment
- Report issues privately to maintainers

## How to Contribute

### 1. Report Bugs
- Check if issue already exists
- Provide detailed description
- Include steps to reproduce
- Share environment details

### 2. Suggest Features
- Use issue template
- Describe the use case
- Explain expected behavior
- Provide mockups if applicable

### 3. Submit Code

#### Setup Development Environment
```bash
# Backend
cd src/backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt

# Frontend
cd src/frontend
npm install
```

#### Create Feature Branch
```bash
git checkout -b feature/your-feature-name
```

#### Code Style

**Python** (Backend)
```python
# Follow PEP 8
# Use type hints
def process_reading(reading: Dict[str, Any]) -> bool:
    """Process a water quality reading."""
    pass
```

**JavaScript** (Frontend)
```javascript
// Use arrow functions
// Components use hooks
const MyComponent = () => {
  const [state, setState] = useState(null);
  return <div>Content</div>;
};
```

#### Testing
```bash
# Backend
cd src/backend
pytest tests/ -v --cov

# Frontend
cd src/frontend
npm test
```

#### Commit Message Format
```
[TYPE]: Brief description

Longer explanation if needed.

Fixes #123 (issue number)
```

Types: feat, fix, docs, style, test, refactor

#### Push and Pull Request
```bash
git push origin feature/your-feature-name
```

Create PR on GitHub with:
- Clear title
- Description of changes
- Screenshots if UI changes
- Test results

## Development Workflow

```
Fork → Clone → Branch → Code → Test → Push → PR → Review → Merge
```

## Project Structure

```
src/
├── backend/          # FastAPI application
│   ├── models/       # Data models
│   ├── routes/       # API endpoints
│   ├── services/     # Business logic
│   └── utils/        # Utilities
├── frontend/         # React application
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── hooks/
│   └── public/
└── iot-simulator/    # IoT simulator
```

## Testing

### Backend Tests
```bash
cd src/backend
# Unit tests
pytest tests/unit/ -v
# Integration tests
pytest tests/integration/ -v
# Coverage
pytest --cov=. tests/
```

### Frontend Tests
```bash
cd src/frontend
# Run tests
npm test
# With coverage
npm test -- --coverage
```

## Documentation

- Update README.md for major changes
- Add docstrings to functions
- Document API changes
- Update ARCHITECTURE.md if structure changes

## Review Process

1. Automated tests must pass
2. Code review by maintainers
3. Approval from at least 1 reviewer
4. Merge to main branch

## Releases

Version format: v1.0.0 (MAJOR.MINOR.PATCH)

### Release Checklist
- [ ] Update version in package.json
- [ ] Update CHANGELOG
- [ ] Tag release: `git tag v1.0.0`
- [ ] Push tags: `git push --tags`
- [ ] Create release notes

## Questions?

- Open an issue on GitHub
- Ask in discussions
- Email: dev@aquaguard.local

## Recognition

Contributors will be listed in README.md and CONTRIBUTORS.md

---

**Happy Contributing!** 🚀

*AquaGuard Team*
