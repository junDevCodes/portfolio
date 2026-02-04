## 📋 Pull Request Checklist

### PR Type
<!-- Check all that apply -->
- [ ] 🐛 Bug fix
- [ ] ✨ New feature
- [ ] 🔥 Breaking change
- [ ] 📝 Documentation update
- [ ] 🎨 UI/UX improvement
- [ ] ♻️ Refactoring
- [ ] ✅ Test update
- [ ] 🔧 Configuration change

### Related Issues
<!-- Link related issues/tasks -->
Closes #

### Description
<!-- Briefly describe what this PR does -->


### Changes Made
<!-- List the key changes -->
- 
- 
- 

### Testing
<!-- Describe how you tested these changes -->

#### Local Testing
- [ ] Tested locally with `npm run dev`
- [ ] Ran build with `npm run build`
- [ ] Tested production build with `npm start`

#### Database Changes (if applicable)
- [ ] Created Prisma migration
- [ ] Tested migration locally
- [ ] Verified schema changes in Prisma Studio

#### Preview Deployment
- [ ] Verified Preview URL (added by Vercel bot)
- [ ] Tested all affected routes
- [ ] Checked console for errors

### Screenshots/Videos (if applicable)
<!-- Add screenshots or screen recordings for UI changes -->


### Checklist
- [ ] Code follows project style guidelines
- [ ] Self-reviewed my own code
- [ ] Commented code in hard-to-understand areas
- [ ] Updated documentation (if needed)
- [ ] No new warnings generated
- [ ] Added tests that prove my fix/feature works (if applicable)
- [ ] New and existing tests pass locally

### Database Migrations
<!-- Only fill if this PR includes database changes -->
- [ ] Migration file created and included
- [ ] Migration tested locally
- [ ] Rollback plan documented (if needed)

### Deployment Notes
<!-- Any special deployment considerations -->
- [ ] No special deployment steps required
- [ ] Requires environment variable updates (list below)
- [ ] Requires manual migration (list steps below)

**Environment Variables** (if any):
```
# Example
NEW_API_KEY=xxx
```

**Manual Steps** (if any):
1. 
2. 

### Reviewer Notes
<!-- Anything specific you want reviewers to focus on -->


---

### For Reviewers

**Backend (박지훈)**: 
- [ ] API endpoints reviewed
- [ ] Database queries optimized
- [ ] Error handling adequate

**Frontend (이서현)**: 
- [ ] UI/UX consistent with design
- [ ] Responsive design verified
- [ ] Accessibility considered

**DevOps (정하은)**: 
- [ ] Deployment config reviewed
- [ ] Environment variables documented
- [ ] Build process verified

**QA (강민서)**: 
- [ ] Test coverage adequate
- [ ] Edge cases considered
- [ ] Performance acceptable
