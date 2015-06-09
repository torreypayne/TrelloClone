module Api
  class BoardMembershipsController < ApiController

    def create
      @user = User.find_by_email(params[:email])
      @membership = BoardMembership.new(
        user_id: @user.id,
        board_id: params[:board_id]
      )
      if @membership.save
        render json: @membership
      else
        render json: @membership.errors, status: :unprocessable_entity
      end
    end

    private

    # def membership_params
    #   params.permit(:email, :board_id)
    # end

  end
end
