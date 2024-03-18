/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  rewrites(){
    return[{
      source: "/api/:path*",//что перенаправляєм
      destination:  "http://localhost:3000/:path*" //куда перенаправляєм
    }]
  }
}

module.exports = nextConfig
