export const getServerSideProps = async () => {
  return {
    redirect: {
      // destination: `https://sso.fishgen.org?client_id=disciplr&response_type=token&redirect_uri=http://localhost:3001/auth&scope=openid%20profile%20email&state=disciplr`,
      destination: `https://sso.fishgen.org?client_id=disciplr&response_type=token&redirect_uri=https://app.fishgen.org/auth&scope=openid%20profile%20email&state=disciplr`,
      permanent: true,
    },
  };
};

export default function Home() {
  return <></>;
}
