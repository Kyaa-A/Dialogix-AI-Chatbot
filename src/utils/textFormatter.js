import React from 'react';

// Enhanced text formatter that supports multiple formatting options
export const formatText = (text) => {
  if (!text) return null;

  // Split text into lines for processing
  const lines = text.split('\n');
  const formattedElements = [];
  let listItems = [];
  let isInCodeBlock = false;
  let codeBlockLines = [];

  lines.forEach((line, index) => {
    // Handle code blocks (```)
    if (line.trim().startsWith('```')) {
      if (isInCodeBlock) {
        // End of code block
        formattedElements.push(
          <div
            key={`code-block-${index}`}
            style={{
              backgroundColor: '#0f172a',
              border: '1px solid #334155',
              borderRadius: '8px',
              padding: '12px',
              margin: '8px 0',
              fontFamily: 'monospace',
              fontSize: '13px',
              overflow: 'auto',
              whiteSpace: 'pre-wrap',
            }}
          >
            {codeBlockLines.join('\n')}
          </div>
        );
        codeBlockLines = [];
        isInCodeBlock = false;
      } else {
        // Start of code block
        isInCodeBlock = true;
      }
      return;
    }

    if (isInCodeBlock) {
      codeBlockLines.push(line);
      return;
    }

    // Flush any pending list items before processing non-list lines
    if (listItems.length > 0 && !isListItem(line)) {
      formattedElements.push(createList(listItems, `list-${index}`));
      listItems = [];
    }

    // Handle different types of lines
    if (isListItem(line)) {
      listItems.push(line);
    } else if (isHeading(line)) {
      formattedElements.push(createHeading(line, index));
    } else if (line.trim() === '') {
      formattedElements.push(<br key={`br-${index}`} />);
    } else {
      formattedElements.push(createFormattedParagraph(line, index));
    }
  });

  // Flush any remaining list items
  if (listItems.length > 0) {
    formattedElements.push(createList(listItems, 'list-final'));
  }

  return <div>{formattedElements}</div>;
};

// Check if line is a list item
const isListItem = (line) => {
  const trimmed = line.trim();
  return (
    trimmed.match(/^\d+\.\s/) || // Numbered list (1. 2. 3.)
    trimmed.match(/^[-*•]\s/) || // Bullet list (- * •)
    trimmed.match(/^[a-z]\)\s/i) // Lettered list (a) b) c))
  );
};

// Check if line is a heading
const isHeading = (line) => {
  return line.trim().match(/^#{1,6}\s/);
};

// Create a formatted paragraph with inline formatting
const createFormattedParagraph = (text, key) => {
  if (!text.trim()) return null;

  return (
    <p
      key={`p-${key}`}
      style={{
        margin: '8px 0',
        lineHeight: '1.6',
        fontSize: '14px',
        wordWrap: 'break-word',
      }}
    >
      {formatInlineText(text)}
    </p>
  );
};

// Create a heading element
const createHeading = (text, key) => {
  const match = text.match(/^(#{1,6})\s(.+)/);
  if (!match) return createFormattedParagraph(text, key);

  const level = match[1].length;
  const content = match[2];
  
  const sizes = {
    1: { fontSize: '20px', fontWeight: '700', margin: '16px 0 12px 0' },
    2: { fontSize: '18px', fontWeight: '600', margin: '14px 0 10px 0' },
    3: { fontSize: '16px', fontWeight: '600', margin: '12px 0 8px 0' },
    4: { fontSize: '15px', fontWeight: '500', margin: '10px 0 6px 0' },
    5: { fontSize: '14px', fontWeight: '500', margin: '8px 0 4px 0' },
    6: { fontSize: '13px', fontWeight: '500', margin: '6px 0 4px 0' },
  };

  return (
    <h1
      key={`h-${key}`}
      style={{
        ...sizes[level],
        color: '#e2e8f0',
        borderBottom: level <= 2 ? '1px solid #334155' : 'none',
        paddingBottom: level <= 2 ? '4px' : '0',
      }}
    >
      {formatInlineText(content)}
    </h1>
  );
};

// Create a list (numbered or bullet)
const createList = (items, key) => {
  const isNumbered = items[0]?.trim().match(/^\d+\./);
  const isLettered = items[0]?.trim().match(/^[a-z]\)/i);
  
  const ListComponent = isNumbered || isLettered ? 'ol' : 'ul';
  
  return React.createElement(
    ListComponent,
    {
      key,
      style: {
        margin: '8px 0',
        paddingLeft: '20px',
        lineHeight: '1.6',
      },
    },
    items.map((item, index) => {
      // Extract the content after the list marker
      const content = item.replace(/^\s*(?:\d+\.|[a-z]\)|[-*•])\s/i, '');
      
      return (
        <li
          key={`${key}-item-${index}`}
          style={{
            margin: '4px 0',
            fontSize: '14px',
          }}
        >
          {formatInlineText(content)}
        </li>
      );
    })
  );
};

// Format inline text with bold, italic, code, etc.
const formatInlineText = (text) => {
  if (!text) return '';

  // Split by different formatting patterns while preserving them
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|~~[^~]+~~|__[^_]+__|_[^_]+_)/);
  
  return parts.map((part, index) => {
    // Bold text (**text**)
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={index} style={{ fontWeight: '700', color: '#f1f5f9' }}>
          {part.slice(2, -2)}
        </strong>
      );
    }
    
    // Bold text (__text__)
    if (part.startsWith('__') && part.endsWith('__')) {
      return (
        <strong key={index} style={{ fontWeight: '700', color: '#f1f5f9' }}>
          {part.slice(2, -2)}
        </strong>
      );
    }
    
    // Italic text (*text*)
    if (part.startsWith('*') && part.endsWith('*') && !part.startsWith('**')) {
      return (
        <em key={index} style={{ fontStyle: 'italic', color: '#e2e8f0' }}>
          {part.slice(1, -1)}
        </em>
      );
    }
    
    // Italic text (_text_)
    if (part.startsWith('_') && part.endsWith('_') && !part.startsWith('__')) {
      return (
        <em key={index} style={{ fontStyle: 'italic', color: '#e2e8f0' }}>
          {part.slice(1, -1)}
        </em>
      );
    }
    
    // Strikethrough text (~~text~~)
    if (part.startsWith('~~') && part.endsWith('~~')) {
      return (
        <span key={index} style={{ textDecoration: 'line-through', opacity: 0.7 }}>
          {part.slice(2, -2)}
        </span>
      );
    }
    
    // Inline code (`text`)
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code
          key={index}
          style={{
            backgroundColor: '#0f172a',
            border: '1px solid #334155',
            borderRadius: '4px',
            padding: '2px 6px',
            fontSize: '13px',
            fontFamily: 'monospace',
            color: '#fbbf24',
          }}
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    
    // Regular text
    return part;
  });
};

// Get plain text version for character counting
export const getPlainText = (text) => {
  if (!text) return '';
  
  return text
    .replace(/```[\s\S]*?```/g, '[Code Block]') // Replace code blocks
    .replace(/`([^`]+)`/g, '$1') // Remove inline code formatting
    .replace(/\*\*([^*]+)\*\*/g, '$1') // Remove bold
    .replace(/\*([^*]+)\*/g, '$1') // Remove italic
    .replace(/__([^_]+)__/g, '$1') // Remove bold
    .replace(/_([^_]+)_/g, '$1') // Remove italic
    .replace(/~~([^~]+)~~/g, '$1') // Remove strikethrough
    .replace(/#{1,6}\s/g, '') // Remove heading markers
    .replace(/^\s*(?:\d+\.|[a-z]\)|[-*•])\s/gim, '• '); // Simplify list markers
};

// Create a formatted preview for long messages
export const formatPreviewText = (text, maxLength = 150) => {
  if (!text) return null;
  
  const plainText = getPlainText(text);
  
  // If the message is short enough, show full formatted version
  if (plainText.length <= maxLength) {
    return formatText(text);
  }
  
  // For long messages, show a truncated but still formatted version
  const lines = text.split('\n');
  let previewText = '';
  let currentLength = 0;
  
  for (const line of lines) {
    const lineText = getPlainText(line);
    if (currentLength + lineText.length > maxLength) {
      // Add partial line if possible
      const remainingChars = maxLength - currentLength;
      if (remainingChars > 20) { // Only add if we have decent space left
        const truncatedLine = line.substring(0, remainingChars) + '...';
        previewText += truncatedLine;
      }
      break;
    }
    previewText += line + '\n';
    currentLength += lineText.length;
  }
  
  // Remove trailing newline and add ellipsis
  previewText = previewText.replace(/\n$/, '') + '...';
  
  return formatText(previewText);
}; 