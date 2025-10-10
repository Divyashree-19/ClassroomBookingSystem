variable "location" {
  default = "Central India"
}

variable "resource_group_name" {
  default = "tfstate-rg"
}

variable "app_service_plan_name" {
  default = "classroom-booking-plan"
}

variable "frontend_app_name" {
  default = "classroom-booking-frontend"
}

variable "backend_app_name" {
  default = "classroom-booking-backend"
}

variable "cosmosdb_account_name" {
  default = "classroombookingcosmosdb"
}
