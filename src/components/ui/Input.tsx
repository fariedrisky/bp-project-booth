interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ label, error, ...props }) => {
  return (
    <div className="w-full">
      {label && (
        <label className="mb-1 block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        {...props}
        className="w-full border border-gray-300 px-3 py-2 text-sm text-primary focus:border-accent focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:bg-gray-100"
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};
