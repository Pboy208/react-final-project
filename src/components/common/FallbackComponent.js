const FallbackComponent = ({ error, resetErrorBoundary }) => {
    console.log("error");
    return (
        <div role="alert">
            There was an error: <pre style={{ whiteSpace: "normal" }}>{error.message}</pre>
            <button onClick={resetErrorBoundary}>Try again</button>
        </div>
    );
};

export default FallbackComponent;
