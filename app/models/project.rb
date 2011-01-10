class Project < ActiveRecord::Base
  has_many :issues, :dependent => :destroy
  
  validates_uniqueness_of :name
  
  acts_as_url :name, :url_attribute => :slug
  
  named_scope :open, :conditions => {:open => true}
  named_scope :closed, :conditions => {:open => false}
  
  def to_param
    slug
  end
end
