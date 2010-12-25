class Issue < ActiveRecord::Base
  validates :name,  :presence => true
  validates :status,  :presence => true
  
  belongs_to :user
end
