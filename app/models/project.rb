class Project < ActiveRecord::Base
  has_many :issues, :dependent => :destroy
  
  acts_as_url :name, :url_attribute => :slug
  
  named_scope :open, :conditions => {:open => true}
  named_scope :closed, :conditions => {:open => false}
  
  def to_param
    slug
  end
end
