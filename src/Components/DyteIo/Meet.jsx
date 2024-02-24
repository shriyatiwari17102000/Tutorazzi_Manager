import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { DyteMeeting } from "@dytesdk/react-ui-kit";
import {
  useDyteClient,
  DyteProvider,
  useDyteMeeting,
} from "@dytesdk/react-web-core";
import classes from "./Meet.module.css"

const Screen = () => {
  const { meeting } = useDyteMeeting();

  return (
    <div style={{ height: "480px" }}>
      <DyteMeeting mode="fill" meeting={meeting} />
    </div>
  );
};

const Meet = () => {
  const { token } = useParams();
  console.log(token, "token")
  console.log("hdfhbdnvf")

  // let token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJvcmdJZCI6IjY4OTRkNDYzLTQwYTctNDI0MC05M2RjLWJiMzBlZjc0MWRiZCIsIm1lZXRpbmdJZCI6ImJiYjg4ZGIyLTUwZjctNDY2Yy1iYWZkLWUyM2QyNWZhN2NmMCIsInBhcnRpY2lwYW50SWQiOiJhYWEzMWU1ZS1mZjgxLTRhY2QtYmJmNS04YmE4M2FlZmViZDIiLCJwcmVzZXRJZCI6IjQ3NmRjMDA4LThlNTQtNDA5Zi1hMmM2LWEzM2ZlODExNzhiNSIsImlhdCI6MTcwMzE2MTA5MiwiZXhwIjoxNzExODAxMDkyfQ.gJNBJSN56fEhL8K3MTpa6i5oDtyerq3-7jz7WwCKR-SIeZ511b2X7ZGRnWaeXgIONiOChO8zYwnSrsa1lPN3yhULIU9IGvcygVj8iN1dUD9yTyypu47m1hk-_WLwDgiui3ol_WWOjlKi6vMOSk2IQvRUqLTtXgb_glch1Ss3oh-O2pdc4zgS5gDrtVDSMst-R-6JTWkUKEI5WOicnjPwhCyXLhHM473EZedHxQLlNXAINPThTIFap9LxDZH4WZnSk92ECwsJDQYH6I0SDiOlB65Sea-xI55OpzW6i4fK7XnQ2oNJg3y2rwG6LEfLrfJyV44cMvVIQXUNbADeyK0F-A"

  const [meeting, initMeeting] = useDyteClient();
  useEffect(() => {
    initMeeting({
      authToken: token,
      default: {
        audio: false,
        video: false,
      },
    });
  }, []);

  return (
    <DyteProvider value={meeting}>
      <div className={classes.dyte1}>
        <Link to={"/"} className="btn btn-danger">
          Dashboard
        </Link>
      </div>
      <Screen />
    </DyteProvider>
  );
};

export default Meet;
