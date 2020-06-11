# frozen_string_literal: true

class Users::RegistrationsController < Devise::RegistrationsController
  def edit
  end

  def update
    current_user.update(user_params)
  end

  private

  def user_params
    params.require(:user).permit(:name, :email)
  end
end
