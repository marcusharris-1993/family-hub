function gapiInit() {
  gapi.load("client:auth2", () => {
    gapi.client.init({
      clientId: "937015904322-2ukhcpv7309fcjkafhvor678t8d10mu6.apps.googleusercontent.com",
      scope: "https://www.googleapis.com/auth/calendar.readonly https://www.googleapis.com/auth/drive.readonly"
    });
  });
}
