# Contributing to MERN Boilerplate

Thank you for your interest in contributing to the MERN Boilerplate project! We welcome contributions from the community.

## How to Contribute

### Reporting Bugs

If you find a bug, please open an issue on GitHub with:
- A clear title and description
- Steps to reproduce the issue
- Expected vs actual behavior
- Your environment (OS, Node version, etc.)
- Screenshots if applicable

### Suggesting Features

We love new ideas! To suggest a feature:
- Open an issue with the "enhancement" label
- Describe the feature and its benefits
- Explain how it would work
- Discuss any potential drawbacks

### Pull Requests

1. **Fork the repository** and create your branch from `main`
2. **Make your changes** following our coding standards
3. **Write tests** for new functionality
4. **Update documentation** if needed
5. **Run the test suite** to ensure everything passes
6. **Run linting and formatting** tools
7. **Create a pull request** with a clear description

### Development Setup

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/mern-boilerplate.git
cd mern-boilerplate

# Install dependencies
cd server && npm install
cd ../client && npm install

# Create a branch
git checkout -b feature/your-feature-name
```

### Coding Standards

#### TypeScript
- Use TypeScript strict mode
- Provide proper types, avoid `any` when possible
- Use interfaces for object shapes
- Document complex types

#### Code Style
- Follow the ESLint and Prettier configurations
- Use meaningful variable and function names
- Keep functions small and focused
- Add comments for complex logic

#### Testing
- Write tests for new features
- Maintain test coverage above 80%
- Use descriptive test names
- Test both success and error cases

#### Commits
- Use clear, descriptive commit messages
- Follow conventional commits format:
  - `feat:` for new features
  - `fix:` for bug fixes
  - `docs:` for documentation changes
  - `test:` for test changes
  - `refactor:` for code refactoring
  - `style:` for formatting changes
  - `chore:` for maintenance tasks

Example:
```
feat: add user profile update endpoint
fix: resolve token refresh race condition
docs: update API documentation for auth endpoints
```

### Code Review Process

1. All PRs require at least one review
2. Address review comments promptly
3. Keep PRs focused and reasonably sized
4. Be respectful and constructive in reviews

### Testing Checklist

Before submitting a PR, ensure:
- [ ] All tests pass (`npm test`)
- [ ] No linting errors (`npm run lint`)
- [ ] Code is formatted (`npm run format`)
- [ ] Documentation is updated
- [ ] No console.log statements (unless intentional)
- [ ] Environment variables are documented

### Questions?

If you have questions, feel free to:
- Open an issue for discussion
- Reach out to maintainers
- Check existing issues and PRs

Thank you for contributing! 🎉
