
declare global {
   interface HTTPError {
       message: string
       status_code: number
   }

   interface RouteInfo {
       route_id: string
       route_short_name: string
       route_long_name: string
       route_color: string
       route_type: number
   }

   interface RouteFeatureProperties {
       routeId: string
       routeName: string
       routeColor: string
       routeLongName: string
   }
}

export {}
