import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
interface RedirectPageProps {
  paymentData: {
    token: string;
    url_webpay: string;
  };
}

const RedirectPage: React.FC<RedirectPageProps> = ({ paymentData }) => {
  return (
    <div>
      <h2>Redirigiendo a Webpay...</h2>
      <div>
        <CircularProgress sx={{ marginTop: "10px" }} />
      </div>
      <form id="webpayForm" method="post" action={paymentData.url_webpay}>
        <input type="hidden" name="TBK_TOKEN" value={paymentData.token} />
        <noscript>
          <input type="submit" value="Ir a pagar" />
        </noscript>
      </form>
    </div>
  );
};

export default RedirectPage;
