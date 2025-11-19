import React from "react";

export default function Contact() {
  return (
    <main>
      <section>
        <h2>Contact Us</h2>
        <form>
          <label>Name:</label>
          <input type="text" name="name"/><br/>
          <label>Email:</label>
          <input type="email" name="email"/><br/>
          <label>Message:</label><br/>
          <textarea name="message"></textarea><br/>
          <button type="submit">Send</button>
        </form>
      </section>

      <div className="map">
        <iframe src="https://www.google.com/maps/embed?pb=YOUR_GOOGLE_MAPS_EMBED_URL" width="100%" height="300" style={{border:0}} allowFullScreen="" loading="lazy" title="map"></iframe>
      </div>
    </main>
  );
}
