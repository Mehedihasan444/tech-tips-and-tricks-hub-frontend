const envConfig = {
    // baseApi: "http://localhost:5000/api/v1",
    baseApi: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1`,
  };
  
  export default envConfig;