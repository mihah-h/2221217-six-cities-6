function Spinner(): JSX.Element {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '200px',
        width: '100%',
      }}
    >
      <div
        style={{
          width: '48px',
          height: '48px',
          border: '4px solid #eee',
          borderTopColor: '#4481c3',
          borderRadius: '50%',
          animation: 'spinner-rotate 0.8s linear infinite',
        }}
      />
      <style>
        {'@keyframes spinner-rotate { to { transform: rotate(360deg); } }'}
      </style>
    </div>
  );
}

export default Spinner;
