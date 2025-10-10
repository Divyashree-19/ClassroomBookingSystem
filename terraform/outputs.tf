

output "backend_url" {
  description = "The URL of the backend app"
  value       = "https://${azurerm_linux_web_app.backend.default_hostname}"
}

output "frontend_url" {
  description = "The URL of the frontend app"
  value       = "https://${azurerm_linux_web_app.frontend.default_hostname}"
}
