// src/index.js
export { CodeInjector } from './components/CodeInjector';
export { useCodeInjection } from './hooks/useCodeInjection';

// Example Usage

/*

import { CodeInjector } from 'code-injector-lib';

function App() {
  const [isEnabled, setIsEnabled] = useState(false);

  const fetchCode = async (codeId) => {
    // Consumer implements their own API call
    const response = await fetch(`/my-api/code/${codeId}`);
    const data = await response.json();
    return data.code;
  };

  return (
    <CodeInjector 
      codeId="example-1"
      enabled={isEnabled}
      onFetch={fetchCode}
    />
  );
}

*/