import React from "react";

const Footer = () => {
  return (
    <footer>
      <p
        class="text-center pt-4 pb-2"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
      >
        Copyright &copy;
        <span id="copyright">
          <script>
            document.getElementById('copyright').appendChild(document.createTextNode(new
            Date() .getFullYear()))
          </script>
        </span>
        Optimized Solutions. All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;
