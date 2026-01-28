import { config, fields, collection, singleton } from '@keystatic/core';
import { jsx } from 'react/jsx-runtime';

export default config({
  storage: {
    kind: 'local',
  },
  ui: {
    brand: {
      name: 'Keystatic',
      // Keystatic 상단 브랜드 영역에 홈 이동 링크를 제공
      // - mark는 ReactNode를 반환할 수 있으므로 JSX 없이 jsx-runtime을 사용
      mark: () =>
        jsx('a', {
          href: '/',
          'aria-label': '홈으로 이동',
          style: {
            display: 'flex',
            alignItems: 'center',
            height: 24,
            fontWeight: 700,
            textDecoration: 'none',
          },
          children: 'Home',
        }),
    },
  },
  collections: {
    // 1. Projects
    projects: collection({
      label: 'Projects',
      slugField: 'title',
      path: 'src/content/projects/*',
      format: { contentField: 'description' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        category: fields.select({
          label: 'Category',
          options: [
            { label: 'AI / Data Science', value: 'AI Research' },
            // 핫픽스: 기존 MDX 데이터의 category 값과 스키마를 일치시킴
            { label: 'Data Science', value: 'Data Science' },
            { label: 'Embedded System', value: 'Embedded System' },
            { label: 'Embedded / IoT', value: 'Embedded / IoT' },
            { label: 'Web Development', value: 'Web Development' },
            { label: 'Mobile App', value: 'Mobile App' },
            { label: 'Other', value: 'Other' },
          ],
          defaultValue: 'Other',
        }),
        role: fields.text({ label: 'Role' }),
        team_size: fields.integer({ label: 'Team Size' }),
        start_date: fields.date({ label: 'Start Date' }),
        end_date: fields.date({ label: 'End Date' }),
        // 신규 관계 필드(Phase 2): Knowledge 컬렉션을 참조
        techs: fields.array(
          fields.relationship({
            label: 'Tech (Knowledge Ref)',
            collection: 'knowledge',
          }),
          {
            label: 'Techs',
            itemLabel: (props) => props.value || 'Select Knowledge',
          }
        ),
        // 레거시 필드(점진 이행): 기존 문자열 배열을 임시 유지
        tech_stack: fields.array(fields.text({ label: 'Legacy Tech' }), {
          label: 'Legacy Tech Stack',
          itemLabel: (props) => props.value,
        }),
        description: fields.mdx({
          label: 'Description (MDX)',
        }),
        github_url: fields.url({ label: 'GitHub URL' }),
        demo_url: fields.url({ label: 'Demo URL' }),
        order: fields.integer({ label: 'Order', defaultValue: 0 }),
        visible: fields.checkbox({ label: 'Visible', defaultValue: true }),
      },
    }),

    // 2. Knowledge (NEW)
    knowledge: collection({
      label: 'Knowledge',
      slugField: 'name',
      path: 'src/content/knowledge/*',
      format: { contentField: 'content' },
      schema: {
        name: fields.slug({ name: { label: 'ID (Slug)' } }),
        display_name: fields.text({ label: 'Display Name' }),
        category: fields.select({
          label: 'Category',
          options: [
            { label: 'CS', value: 'cs' },
            { label: 'Language', value: 'language' },
            { label: 'Framework', value: 'framework' },
            { label: 'Library', value: 'library' },
            { label: 'Tooling', value: 'tooling' },
            { label: 'Platform', value: 'platform' },
            { label: 'Database', value: 'database' },
          ],
          defaultValue: 'cs',
        }),
        summary: fields.text({
          label: 'Summary',
          multiline: true,
        }),
        // 추가 요청: UI 시각화를 위한 아이콘 경로/URL
        icon: fields.text({
          label: 'Icon (Path or URL)',
          description: '기술 뱃지/아이콘 표시용 경로 또는 URL',
        }),
        aliases: fields.array(fields.text({ label: 'Alias' }), {
          label: 'Aliases',
          itemLabel: (props) => props.value,
        }),
        tags: fields.array(fields.text({ label: 'Tag' }), {
          label: 'Tags',
          itemLabel: (props) => props.value,
        }),
        related: fields.array(
          fields.relationship({
            label: 'Related Knowledge',
            collection: 'knowledge',
          }),
          {
            label: 'Related',
            itemLabel: (props) => props.value || 'Select Knowledge',
          }
        ),
        url: fields.url({ label: 'Reference URL' }),
        content: fields.mdx({
          label: 'Content (MDX)',
        }),
      },
    }),

    // 3. Concept Notes (AI 그래프/RAG 확장용)
    conceptNotes: collection({
      label: 'Concept Notes (Graph)',
      slugField: 'topic',
      path: 'src/content/concept-notes/*',
      format: { contentField: 'content' },
      schema: {
        topic: fields.slug({ name: { label: 'Topic' } }),
        related_concepts: fields.array(
          fields.relationship({
            label: 'Related Concept',
            collection: 'conceptNotes',
          }),
          {
            label: 'Related Concepts (Graph Edges)',
            description: '향후 AI가 자동으로 채우는 필드로 확장 예정',
            itemLabel: (props) => props.value || 'Select Concept',
          }
        ),
        ai_explanation: fields.text({
          label: 'AI Explanation (Definition)',
          multiline: true,
          description: '향후 Gemini 기반 자동 생성 정의로 확장 예정',
        }),
        content: fields.mdx({
          label: 'My Notes',
        }),
        visual_graph: fields.text({
          label: 'Graph Data (JSON)',
          description: '시각화용 내부 데이터',
        }),
      },
    }),

    // 4. Blog
    blog: collection({
      label: 'Blog',
      slugField: 'title',
      path: 'src/content/blog/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        published_date: fields.date({ label: 'Published Date' }),
        tags: fields.array(fields.text({ label: 'Tag' }), { label: 'Tags' }),
        content: fields.mdx({
          label: 'Content',
        }),
      },
    }),

    // 5. Resume Sections
    work: collection({
      label: 'Work Experience',
      slugField: 'company',
      path: 'src/content/work/*',
      format: { data: 'json' },
      schema: {
        company: fields.slug({ name: { label: 'Company' } }),
        position: fields.text({ label: 'Position' }),
        department: fields.text({ label: 'Department' }),
        start_date: fields.date({ label: 'Start Date' }),
        end_date: fields.date({ label: 'End Date' }),
        is_current: fields.checkbox({ label: 'Current Job?' }),
        description: fields.text({ label: 'Description', multiline: true }),
        achievements: fields.array(fields.text({ label: 'Achievement' }), {
          label: 'Achievements',
          itemLabel: (props) => props.value,
        }),
        order: fields.integer({ label: 'Order', defaultValue: 0 }),
        visible: fields.checkbox({ label: 'Visible', defaultValue: true }),
      },
    }),
    education: collection({
      label: 'Education',
      slugField: 'school',
      path: 'src/content/education/*',
      format: { data: 'json' },
      schema: {
        school: fields.slug({ name: { label: 'School' } }),
        major: fields.text({ label: 'Major' }),
        degree: fields.text({ label: 'Degree' }),
        status: fields.text({ label: 'Status' }),
        start_date: fields.date({ label: 'Start Date' }),
        end_date: fields.date({ label: 'End Date' }),
        gpa: fields.text({ label: 'GPA' }),
        order: fields.integer({ label: 'Order', defaultValue: 0 }),
        visible: fields.checkbox({ label: 'Visible', defaultValue: true }),
      },
    }),
    certifications: collection({
      label: 'Certifications',
      slugField: 'name',
      path: 'src/content/certifications/*',
      format: { data: 'json' },
      schema: {
        name: fields.slug({ name: { label: 'Certification Name' } }),
        issuer: fields.text({ label: 'Issuer' }),
        date: fields.date({ label: 'Date' }),
        type: fields.text({ label: 'Type' }),
        score: fields.text({ label: 'Score' }),
        order: fields.integer({ label: 'Order', defaultValue: 0 }),
        visible: fields.checkbox({ label: 'Visible', defaultValue: true }),
      },
    }),
  },
  singletons: {
    profile: singleton({
      label: 'Profile',
      path: 'src/content/profile/jylee',
      format: { data: 'json' },
      schema: {
        name: fields.text({ label: 'Name' }),
        title: fields.text({ label: 'Title' }),
        summary: fields.text({ label: 'Summary', multiline: true }),
        area: fields.array(fields.text({ label: 'Area' }), {
          label: 'Areas',
          itemLabel: (props) => props.value,
        }),
        email: fields.text({ label: 'Email' }),
        phone: fields.text({ label: 'Phone' }),
        photo: fields.text({ label: 'Photo URL' }),
      },
    }),
  },
});
