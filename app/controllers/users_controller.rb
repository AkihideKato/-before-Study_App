class UsersController < ApplicationController
  def edit
  end

  def update
    current_user.update(user_params)
    redirect_to root_path, notice: 'プロフィールを更新しました'
  end

  private

  def user_params
    params.require(:user).permit(:name, :email)
  end
end
