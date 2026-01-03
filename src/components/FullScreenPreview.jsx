import { IoCloseSharp } from 'react-icons/io5';

const FullscreenPreview = ({ code, onClose }) => {
  return (
    <div
      className="fixed inset-0 z-50"
      style={{ background: 'var(--primary-bg)', color: 'var(--text-primary)' }}
    >
      <div
        className="h-14 flex justify-between items-center px-4 border-b"
        style={{
          background: 'var(--secondary-bg)',
          borderColor: 'var(--border-color)',
        }}
      >
        <span className="font-semibold">Preview</span>
        <button
          onClick={onClose}
          className="text-xl hover:opacity-75 transition"
        >
          <IoCloseSharp />
        </button>
      </div>

      <iframe
        srcDoc={code}
        className="w-full h-[calc(100%-56px)] bg-white"
      />
    </div>
  );
};

export default FullscreenPreview;
