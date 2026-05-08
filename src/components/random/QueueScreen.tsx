export default function QueueScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
      <div className="text-center">
        <div className="w-20 h-20 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>

        <h1 className="text-3xl font-bold mb-3">
          Finding Someone...
        </h1>

        <p className="text-slate-400">
          Matching based on interests
        </p>
      </div>
    </div>
  );
}
