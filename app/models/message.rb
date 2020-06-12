class Message < ApplicationRecord
  validates :text, presence: true
  validates :title, presence: true
  has_many :likes, dependent: :destroy
  def likes_user(user_id)
    likes.find_by(user_id: user_id)
  end
  belongs_to :user, optional: true
  has_many :likes
end
