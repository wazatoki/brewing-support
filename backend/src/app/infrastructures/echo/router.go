package echo

import (
	"brewing_support/app/infrastructures/echo/handlers"
	"brewing_support/app/utils/config"

	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
)

func defineRouting(e *echo.Echo) {

	e.GET("/", handlers.Root)
	e.GET("/index", handlers.Index)
	e.POST("/login", handlers.Login)

	apiPath := "/api"
	api := e.Group(apiPath)
	api.Use(middleware.JWT([]byte(config.SecretKey())))
	api.POST("/refreshToken", handlers.RefreshToken)
}
