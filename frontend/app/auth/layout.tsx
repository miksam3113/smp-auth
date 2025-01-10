const AuthLayout = (props: { children: React.ReactNode }) => {
  return (
    <div className="h-full flex items-center justify-center bg-sky-500">
      {props.children}
    </div>
  );
};

export default AuthLayout;
