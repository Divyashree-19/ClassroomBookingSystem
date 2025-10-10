resource "azurerm_resource_group" "classroom_rg" {
  name     = var.resource_group_name
  location = var.location
}

resource "azurerm_service_plan" "plan" {
  name                = var.app_service_plan_name
  location            = azurerm_resource_group.classroom_rg.location
  resource_group_name = azurerm_resource_group.classroom_rg.name
  os_type             = "Linux"
  sku_name            = "S1"
}

resource "azurerm_linux_web_app" "backend" {
  name                = var.backend_app_name
  resource_group_name = azurerm_resource_group.classroom_rg.name
  location            = azurerm_resource_group.classroom_rg.location
  service_plan_id     = azurerm_service_plan.plan.id

  site_config {}

  app_settings = {
    "WEBSITES_ENABLE_APP_SERVICE_STORAGE" = "false"
    "WEBSITE_NODE_DEFAULT_VERSION"        = "18-lts"
  }
}


resource "azurerm_linux_web_app" "frontend" {
  name                = var.frontend_app_name
  resource_group_name = azurerm_resource_group.classroom_rg.name
  location            = azurerm_resource_group.classroom_rg.location
  service_plan_id     = azurerm_service_plan.plan.id

  site_config {}

  app_settings = {
    "WEBSITES_ENABLE_APP_SERVICE_STORAGE" = "false"
    "WEBSITE_NODE_DEFAULT_VERSION"        = "18-lts"
    "BACKEND_URL"                         = "https://${azurerm_linux_web_app.backend.default_hostname}"
  }
}
