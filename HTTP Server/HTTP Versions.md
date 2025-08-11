# HTTP, HTTPS, HTTP/1.1, and HTTP/2 Overview

## HTTP
HTTP is a protocol used by clients for example web browsers to request a resource from servers

---

## HTTPS
HTTPS is an encrypted form of HTTP.  
it wraps the messages in encrypted formate using SSL/TLS and now most web browsers use it and put warnings over the normal HTTP

---

## HTTP/1.1
HTTP/1.1 was a common format of HTTP.  
It is a text-based protocol and has some inefficiencies, especially when requesting lots of resources.

The HTTP/1.1 messages can be:
- **Unencrypted** if the web address is `http://`
- **Encrypted** with HTTPS when the address is `https://`

---

## HTTP/2
HTTP/2  a new version of HTTP released in 2015 which solves some of the performance issues by removing the text based protocol and replace a binary one where each byte is clearly defined. Therefore it is easier to parse for both the clients and servers, reduces error and allows multiplexing.

It is like HTTP/1.1 — available in both encrypted and unencrypted channels — but web browsers support it only over HTTPS.

---

## When to Use Which in Real-World Applications

- **HTTP (Unencrypted)**
    - Rarely used today for public-facing applications
    - May be acceptable for internal systems not exposed to the internet
    - Not recommended for transmitting sensitive data

- **HTTPS**
    - Use for **all** public web applications
    - Essential for secure data transmission, user privacy, and browser compatibility
    - Required for modern features like HTTP/2, service workers, and geolocation APIs

- **HTTP/1.1**
    - Still widely used and supported for compatibility
    - Suitable for simple applications or APIs with low concurrent request demands
    - Use HTTPS with it for security

- **HTTP/2**
    - Recommended for modern, resource-heavy sites and applications
    - Ideal when serving many small files (CSS, JS, images) due to multiplexing
    - Requires HTTPS in most browsers
