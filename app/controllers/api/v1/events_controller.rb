module Api
  module V1
    class EventsController < BaseController
      def upcoming
        if upcoming_event = Event.upcoming
          render json: upcoming_event
        else
          render json: { message: 'No upcoming events yet!' }
        end
      end
    end
  end
end
