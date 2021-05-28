import React from "react";
import { connect } from "react-redux";

function Home(user) {
  return (
    <div>
      <h1>Home</h1>
      {user && <h1>Welcome {user.name}</h1>}

      {JSON.stringify(user)}
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.user?.user,
});

export default connect(mapStateToProps, {})(Home);
