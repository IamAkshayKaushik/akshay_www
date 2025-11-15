import React from 'react';
import { render, screen } from '@testing-library/react';
import BlogPost from '@/app/blog/[slug]/page';

jest.mock('next/dynamic', () => () => {
  const DynamicComponent = () => <div>Mocked Dynamic Component</div>;
  DynamicComponent.displayName = 'MockedDynamicComponent';
  return DynamicComponent;
});

jest.mock('fs', () => ({
  readFileSync: jest.fn(() => '---\ntitle: "Sample Blog Post"\ndate: "2023-10-26"\nauthor: "John Doe"\n---\n\n## Introduction'),
}));

jest.mock('path', () => ({
  join: jest.fn(() => ''),
}));

jest.mock('glob', () => ({
  glob: jest.fn(() => []),
}));

jest.mock('gray-matter', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    data: {
      title: 'Sample Blog Post',
      date: '2023-10-26',
      author: 'John Doe',
    },
    content: '## Introduction',
  })),
}));

jest.mock('@/components/AuthorBio', () => () => {
  const MockAuthorBio = () => <div>Mock Author Bio</div>;
  MockAuthorBio.displayName = 'MockAuthorBio';
  return MockAuthorBio;
});

describe('BlogPost', () => {
  it('renders the blog post title', async () => {
    const page = await BlogPost({ params: { slug: 'sample-post' } });
    render(page);

    const title = screen.getByText('Sample Blog Post');
    expect(title).toBeInTheDocument();
  });
});
