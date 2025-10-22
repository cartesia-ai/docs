export const AudioPlayer = ({ src }) => {
  // Estado para rastrear o status de carregamento e erro
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);
  }, [src]);

  const handleCanPlay = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  const audioClasses = [
    "w-full",
    "rounded-full",
    isLoading || hasError ? "opacity-50" : "opacity-100",
    hasError ? "pointer-events-none" : "",
    "transition-opacity",
  ].join(" ");

  return (
    <div className="my-4">
      <audio src={src} controls onCanPlay={handleCanPlay} onError={handleError} className={audioClasses} />

      {isLoading && !hasError && <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 pl-4">Loading audio...</p>}
    </div>
  );
};
