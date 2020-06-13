class Message < ApplicationRecord
  validates :text, presence: true
  validates :title, presence: true

  has_many :likes, dependent: :destroy
  belongs_to :user, optional: true
  # has_many :likes

  def likes_user(user_id)
    likes.find_by(user_id: user_id)
  end

  def self.search(search)
    return Message.all unless search
    Message.where('text LIKE(?)', "%#{search}%")
  end

end
