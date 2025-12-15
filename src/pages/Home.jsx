import { useCallback, useMemo, useState } from 'react';
import Navbar from '../components/Navbar';
import Select from 'react-select';
import Editor from '@monaco-editor/react';

import { BsStars } from 'react-icons/bs';
import { HiOutlineCode } from 'react-icons/hi';
import { IoCloseSharp, IoCopy } from 'react-icons/io5';
import { PiExportBold } from 'react-icons/pi';
import { ImNewTab } from 'react-icons/im';
import { FiRefreshCcw } from 'react-icons/fi';

import { GoogleGenAI } from '@google/genai';
import { ScaleLoader } from 'react-spinners';
import { toast } from 'react-toastify';

const frameworkOptions = [
  { value: 'html-css', label: 'HTML + CSS' },
  { value: 'html-tailwind', label: 'HTML + Tailwind CSS' },
  { value: 'html-bootstrap', label: 'HTML + Bootstrap' },
  { value: 'html-css-js', label: 'HTML + CSS + JS' },
  { value: 'html-tailwind-bootstrap', label: 'HTML + Tailwind + Bootstrap' },
];

const Home = () => {
  const [prompt, setPrompt] = useState('');
  const [framework, setFramework] = useState(frameworkOptions[0]);
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);

  const [showOutput, setShowOutput] = useState(false);
  const [activeTab, setActiveTab] = useState('code');
  const [refreshKey, setRefreshKey] = useState(0);
  const [fullscreenPreview, setFullscreenPreview] = useState(false);

  const ai = useMemo(() => {
    return new GoogleGenAI({
      apiKey: import.meta.env.VITE_GEMINI_API_KEY,
    });
  }, []);

  const extractCode = (text = '') => {
    const match = text.match(/```(?:\w+)?\n?([\s\S]*?)```/);
    return match ? match[1].trim() : text.trim();
  };

  const generateCode = useCallback(async () => {
    if (!prompt.trim()) {
      toast.error('Please describe your component first');
      return;
    }

    setLoading(true);

    try {
      const res = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `
Generate a modern, responsive UI component.

Description:
"${prompt}"

Framework:
${framework.value}

Rules:
- Return ONLY code
- Wrap in a Markdown code block
- Single HTML file
- No explanations
`,
      });

      setCode(extractCode(res.text));
      setShowOutput(true);
      setActiveTab('code');
    } catch (err) {
      toast.error('Failed to generate code');
    } finally {
      setLoading(false);
    }
  }, [prompt, framework, ai]);

  const copyCode = async () => {
    if (!code) return toast.error('Nothing to copy');
    await navigator.clipboard.writeText(code);
    toast.success('Copied to clipboard');
  };

  const downloadCode = () => {
    if (!code) return toast.error('Nothing to download');

    const blob = new Blob([code], { type: 'text/html' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'component.html';
    a.click();

    URL.revokeObjectURL(url);
    toast.success('File downloaded');
  };

  const selectStyles = {
    control: (base) => ({
      ...base,
      backgroundColor: 'var(--secondary-bg)',
      borderColor: 'var(--border-color)',
      boxShadow: 'none',
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: 'var(--secondary-bg)',
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isFocused
        ? 'var(--tertiary-bg)'
        : 'var(--secondary-bg)',
      cursor: 'pointer',
    }),
  };

  return (
    <>
      <Navbar />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 px-6 lg:px-16">
        {/* Input */}
        <div className="mt-5 p-5 rounded-xl" style={{ background: 'var(--secondary-bg)' }}>
          <h3 className="text-2xl font-semibold">AI Component Generator</h3>
          <p className="mt-2 text-sm text-gray-400">
            Describe your component and generate code instantly.
          </p>

          <p className="mt-4 font-semibold">Framework</p>
          <Select
            value={framework}
            options={frameworkOptions}
            onChange={setFramework}
            styles={selectStyles}
          />

          <p className="mt-5 font-semibold">Description</p>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full min-h-[200px] rounded-xl p-3 mt-2 resize-none outline-none"
            style={{ background: 'var(--primary-bg)' }}
            placeholder="Pricing card with hover animation..."
          />

          <div className="flex justify-between items-center mt-4">
            <span className="text-sm text-gray-400">
              Click generate when ready
            </span>
            <button
              onClick={generateCode}
              className="flex items-center gap-2 bg-purple-600 px-5 py-3 rounded-lg text-white"
            >
              Generate
              {loading ? <ScaleLoader height={14} color="#fff" /> : <BsStars />}
            </button>
          </div>
        </div>

        {/* Output */}
        <div className="rounded-xl h-[80vh] overflow-hidden mt-5" style={{ background: 'var(--secondary-bg)' }}>
          {!showOutput ? (
            <div className="h-full flex flex-col items-center justify-center">
              <div className="w-14 h-14 rounded-full bg-purple-600 flex items-center justify-center text-xl">
                <HiOutlineCode />
              </div>
              <p className="mt-3 text-gray-400">Generated code appears here</p>
            </div>
          ) : (
            <>
              <div className="flex gap-2 p-2 bg-[var(--tertiary-bg)]">
                <button
                  onClick={() => setActiveTab('code')}
                  className={`flex-1 py-2 rounded ${activeTab === 'code' ? 'bg-purple-600' : ''}`}
                >
                  Code
                </button>
                <button
                  onClick={() => setActiveTab('preview')}
                  className={`flex-1 py-2 rounded ${activeTab === 'preview' ? 'bg-purple-600' : ''}`}
                >
                  Preview
                </button>
              </div>

              <div className="flex justify-between items-center px-4 h-12 bg-[var(--tertiary-bg)]">
                <span className="font-semibold">Editor</span>
                <div className="flex gap-3 text-lg">
                  {activeTab === 'code' ? (
                    <>
                      <button onClick={copyCode}><IoCopy /></button>
                      <button onClick={downloadCode}><PiExportBold /></button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => setFullscreenPreview(true)}><ImNewTab /></button>
                      <button onClick={() => setRefreshKey((k) => k + 1)}><FiRefreshCcw /></button>
                    </>
                  )}
                </div>
              </div>

              {activeTab === 'code' ? (
                <Editor height="100%" theme="vs-dark" language="html" value={code} />
              ) : (
                <iframe key={refreshKey} srcDoc={code} className="w-full h-full bg-white" />
              )}
            </>
          )}
        </div>
      </div>

      {fullscreenPreview && (
        <div className="fixed inset-0 bg-white z-50">
          <div className="h-14 bg-gray-100 flex justify-between items-center px-4">
            <span className="font-semibold">Preview</span>
            <button onClick={() => setFullscreenPreview(false)}>
              <IoCloseSharp />
            </button>
          </div>
          <iframe srcDoc={code} className="w-full h-[calc(100%-56px)]" />
        </div>
      )}
    </>
  );
};

export default Home;
