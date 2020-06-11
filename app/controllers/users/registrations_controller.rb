# frozen_string_literal: true

class Users::RegistrationsController < Devise::RegistrationsController
  def edit
  end

  def user_update
    current_user.assign_attributes(account_update_params)
    if current_user.save
	  redirect_to root_path, notice: 'プロフィールを更新しました'
    else
      render "user_edit"
    end
  end
  
  private

  def user_params
    params.require(:user).permit(:name, :email)
  end
  
  protected
  
  def configure_account_update_params
   devise_parameter_sanitizer.permit(:account_update, keys: [:name])
  end

end
