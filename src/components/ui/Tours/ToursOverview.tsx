const ToursOverview = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="main">
      <div className="card-container">{children}</div>
    </main>
  );
};

export default ToursOverview;
